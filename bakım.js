const { SlashCommandBuilder } = require('discord.js');
const { ownerID } = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bakım')
    .setDescription('Botu bakım moduna alır veya çıkarır.')
    .addBooleanOption(option =>
      option.setName('durum')
        .setDescription('Bakım modunu aç veya kapat.')
        .setRequired(true)),
  async execute(interaction) {
    if (interaction.user.id !== ownerID) {
      return interaction.reply({ content: 'Bu komutu sadece bot sahibi kullanabilir.', ephemeral: true });
    }

    const durum = interaction.options.getBoolean('durum');
    const fs = require('fs');
    const config = require('../config.json');

    config.bakımModu = durum;

    fs.writeFileSync('./config.json', JSON.stringify(config, null, 2));

    return interaction.reply({ content: `Bakım modu ${durum ? 'açıldı' : 'kapatıldı'}.`, ephemeral: true });
  },
};
