const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yaz')
        .setDescription('Bota bir mesaj yazdırır.')
        .addStringOption(option => option.setName('mesaj').setDescription('Bota yazdırılacak mesaj').setRequired(true)),
    async execute(interaction) {
        const message = interaction.options.getString('mesaj');

        try {
            await interaction.channel.send(message);
            interaction.reply({ content: 'Mesaj başarıyla gönderildi!', ephemeral: true });
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'Mesaj gönderilirken bir hata oluştu.', ephemeral: true });
        }
    },
};
