const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Bir kullanıcıyı sunucudan atar.')
        .addUserOption(option => option.setName('kullanıcı').setDescription('Atılacak kullanıcı').setRequired(true))
        .addStringOption(option => option.setName('sebep').setDescription('Atılma sebebi').setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('kullanıcı');
        const reason = interaction.options.getString('sebep') || 'Sebep belirtilmedi';
        const member = interaction.guild.members.cache.get(user.id);

        if (!member) return interaction.reply({ content: 'Bu kullanıcı sunucuda bulunmuyor!', ephemeral: true });

        try {
            await member.kick(reason);
            interaction.reply({ content: `${user.tag} adlı kullanıcı başarıyla atıldı!`, ephemeral: true });
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'Kullanıcıyı atarken bir hata oluştu.', ephemeral: true });
        }
    },
};
