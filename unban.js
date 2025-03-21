const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Bir kullanıcının yasağını kaldırır.')
        .addStringOption(option => option.setName('kullanıcı').setDescription('Yasağı kaldırılacak kullanıcının ID\'si').setRequired(true)),
    async execute(interaction) {
        const userId = interaction.options.getString('kullanıcı');

        try {
            await interaction.guild.members.unban(userId);
            interaction.reply({ content: `ID'si ${userId} olan kullanıcının yasağı kaldırıldı!`, ephemeral: true });
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'Kullanıcının yasağını kaldırırken bir hata oluştu.', ephemeral: true });
        }
    },
};
