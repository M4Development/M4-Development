const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Bir kullanıcının susturmasını kaldırır.')
        .addUserOption(option => option.setName('kullanıcı').setDescription('Susturması kaldırılacak kullanıcı').setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('kullanıcı');
        const member = interaction.guild.members.cache.get(user.id);

        if (!member) return interaction.reply({ content: 'Bu kullanıcı sunucuda bulunmuyor!', ephemeral: true });

        try {
            await member.timeout(null);
            interaction.reply({ content: `${user.tag} başarıyla susturulması kaldırıldı!`, ephemeral: true });
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'Kullanıcının susturmasını kaldırırken bir hata oluştu.', ephemeral: true });
        }
    },
};
