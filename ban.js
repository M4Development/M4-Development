const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bir kullanıcıyı sunucudan yasaklar.')
        .addUserOption(option => option.setName('kullanıcı').setDescription('Yasaklanacak kullanıcı').setRequired(true))
        .addStringOption(option => option.setName('sebep').setDescription('Yasaklama sebebi').setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('kullanıcı');
        const reason = interaction.options.getString('sebep') || 'Sebep belirtilmedi';
        const member = interaction.guild.members.cache.get(user.id);

        if (!member) return interaction.reply({ content: 'Bu kullanıcı sunucuda bulunmuyor!', ephemeral: true });

        try {
            await member.ban({ reason });
            await user.send(`Sunucudan yasaklandınız. Sebep: ${reason}`);
            interaction.reply({ content: `${user.tag} adlı kullanıcı başarıyla yasaklandı!`, ephemeral: true });
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'Kullanıcıyı yasaklarken bir hata oluştu.', ephemeral: true });
        }
    },
};
