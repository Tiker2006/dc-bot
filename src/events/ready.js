module.exports = client => {
  console.log(`\nWłączony został bot: ${client.user.tag}`);
  client.user.setActivity('.komendy', { type: 'WATCHING' })
};