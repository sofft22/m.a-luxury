-- Create the table
CREATE TABLE IF NOT EXISTS weekly_schedule (
  id INTEGER PRIMARY KEY, 
  isOpen INTEGER DEFAULT 1,
  startTime TEXT DEFAULT '09:00',
  endTime TEXT DEFAULT '18:00'
);

-- Insert the default schedule
INSERT OR IGNORE INTO weekly_schedule (id, isOpen, startTime, endTime) VALUES 
(0, 0, '09:00', '18:00'),
(1, 1, '09:00', '18:00'),
(2, 1, '09:00', '18:00'),
(3, 1, '09:00', '18:00'),
(4, 1, '09:00', '18:00'),
(5, 1, '09:00', '18:00'),
(6, 1, '09:00', '18:00');
