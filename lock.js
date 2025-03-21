const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lock')
        .setDescription('Seçilen kanalları kilitler.')
        .addChannelOption(option => option.setName('kanal').setDescription('Kilitlenecek kanal').setRequired(false)),
    async execute(interaction) {
        const channel = interaction.options.getChannel('kanal') || interaction.channel;

        try {
            await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: false });
            interaction.reply({ content: `${channel.name} kanalı başarıyla kilitlendi!`, ephemeral: true });
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'Kanalı kilitlerken bir hata oluştu.', ephemeral: true });
        }
    },
};
