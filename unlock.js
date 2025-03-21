const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unlock')
        .setDescription('Seçilen kanalların kilidini açar.')
        .addChannelOption(option => option.setName('kanal').setDescription('Kilidi açılacak kanal').setRequired(false)),
    async execute(interaction) {
        const channel = interaction.options.getChannel('kanal') || interaction.channel;

        try {
            await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: true });
            interaction.reply({ content: `${channel.name} kanalı başarıyla kilidini açtı!`, ephemeral: true });
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'Kanalın kilidini açarken bir hata oluştu.', ephemeral: true });
        }
    },
};
