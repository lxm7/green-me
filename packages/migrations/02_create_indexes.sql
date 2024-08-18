-- Indexes to optimize queries
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_venues_user_id ON venues(user_id);
CREATE INDEX idx_chats_profile_id ON chats(profile_id);
CREATE INDEX idx_chats_venue_id ON chats(venue_id);
CREATE INDEX idx_messages_chat_id ON messages(chat_id);

