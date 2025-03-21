const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yavaş-mod')
        .setDescription('Yavaş modu ayarlar.')
        .addIntegerOption(option => option.setName('saniye').setDescription('Yavaş mod süresi (0-21600 saniye)').setRequired(true)),
    async execute(interaction) {
        const seconds = interaction.options.getInteger('saniye');

        if (seconds < 0 || seconds > 21600) {
            return interaction.reply({ content: 'Yavaş mod süresi 0 ile 21600 saniye arasında olmalıdır!', ephemeral: true });
        }

        try {
            await interaction.channel.setRateLimitPerUser(seconds);
            interaction.reply({ content: `Yavaş mod başarıyla ${seconds} saniye olarak ayarlandı!`, ephemeral: true });
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'Yavaş mod ayarlanırken bir hata oluştu.', ephemeral: true });
        }
    },
};
