const { SlashCommandBuilder } = require('@discordjs/builders');
const ms = require('ms');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Bir kullanıcıyı susturur.')
        .addUserOption(option => option.setName('kullanıcı').setDescription('Susturulacak kullanıcı').setRequired(true))
        .addStringOption(option => option.setName('süre').setDescription('Susturma süresi (ör. 10s, 5m)').setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('kullanıcı');
        const member = interaction.guild.members.cache.get(user.id);
        const duration = interaction.options.getString('süre');

        if (!member) return interaction.reply({ content: 'Bu kullanıcı sunucuda bulunmuyor!', ephemeral: true });

        try {
            await member.timeout(ms(duration));
            interaction.reply({ content: `${user.tag} başarıyla ${duration || 'süresiz'} susturuldu!`, ephemeral: true });
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'Kullanıcıyı sustururken bir hata oluştu.', ephemeral: true });
        }
    },
};
