---
title: Discord Architecture
---

# Discord Architecture

## Store Billions of Messages

### Time Bucket

Instead of saving all messages into a single table, it's much wiser to split them vertically. Since the messages are naturally bound to a time, Discord decided to set the primary key for `Message` to `((channel_id, bucket), message_id)`. In particular, the `bucket` derives from the `message_id` or a timestamp 

```python
DISCORD_EPOCH = 1420070400000
BUCKET_SIZE = 1000 * 60 * 60 * 24 * 10

def make_bucket(snowflake):
   if snowflake is None:
       timestamp = int(time.time() * 1000) - DISCORD_EPOCH
   else:
       # When a Snowflake is created it contains the number of seconds since the DISCORD_EPOCH.
       timestamp = snowflake_id >> 22
   return int(timestamp / BUCKET_SIZE)
```

### Data Modeling

The data model of the `Message` is non-trivial like below.

```sql
CREATE TABLE messages (
   channel_id bigint,
   bucket int,
   message_id bigint,
   author_id bigint,
   content text,
   PRIMARY KEY ((channel_id, bucket), message_id)
) WITH CLUSTERING ORDER BY (message_id DESC);
```

### Database

Discord chose Cassandra as the backend database for messages. It's an AP database, meaning it trades Consistency with Availability.

To eliminate potential inconsistencies, Discord runs background jobs for cleaning data. The deletion of the message is to simply mark it as trash and garbage collected in 2 days.

## References

* [blog.discordapp.com](https://blog.discordapp.com/how-discord-stores-billions-of-messages-7fa6ec7ee4c7)
