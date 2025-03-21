const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yardım')
        .setDescription('Botun komutlarını listeler.')
        .addStringOption(option =>
            option
                .setName('kategori')
                .setDescription('Belirli bir kategori için yardım al.')
                .addChoices(
                    { name: 'Moderasyon', value: 'moderasyon' },
                    { name: 'Genel', value: 'genel' },
                    { name: 'Bakım', value: 'bakim' }
                )
        ),
    async execute(interaction) {
        const kategori = interaction.options.getString('kategori');

        // Komutları kategorilere ayırma
        const komutlar = {
            moderasyon: [
                { isim: '/ban', açıklama: 'Bir kullanıcıyı sunucudan banlar.' },
                { isim: '/unban', açıklama: 'Banlanan bir kullanıcının banını kaldırır.' },
                { isim: '/mute', açıklama: 'Bir kullanıcıyı susturur (süreli veya süresiz).' },
                { isim: '/unmute', açıklama: 'Bir kullanıcının susturmasını kaldırır.' },
                { isim: '/lock', açıklama: 'Belirli bir kanalı kilitler.' },
                { isim: '/unlock', açıklama: 'Kilitli bir kanalı açar.' },
            ],
            genel: [
                { isim: '/yardım', açıklama: 'Botun komutlarını listeler.' },
                { isim: '/yavaş-mod', açıklama: 'Bir kanal için yavaş modu ayarlar.' },
                { isim: '/yaz', açıklama: 'Botun bir mesaj göndermesini sağlar.' },
            ],
            bakim: [
                { isim: '/bakım', açıklama: 'Botu bakım moduna alır veya çıkarır.' },
                { isim: '/karaliste', açıklama: 'Bir kullanıcıyı kara listeye ekler.' },
            ],
        };

        const embed = new EmbedBuilder().setColor('#5865F2').setTimestamp();

        // Eğer kategori belirtilmişse
        if (kategori) {
            embed
                .setTitle(`Kategori: ${kategori.charAt(0).toUpperCase() + kategori.slice(1)}`)
                .setDescription(
                    komutlar[kategori]
                        .map(cmd => `**${cmd.isim}** - ${cmd.açıklama}`)
                        .join('\n')
                );
        } else {
            // Tüm komutları genel olarak listele
            embed
                .setTitle('Tüm Komutlar')
                .setDescription('Botun tüm komutlarını kategorilere göre görüntüleyebilirsiniz.')
                .addFields(
                    { name: '🔒 Moderasyon', value: '`/ban`, `/unban`, `/mute`, `/unmute`, `/lock`, `/unlock`', inline: false },
                    { name: '🌐 Genel', value: '`/yardım`, `/yavaş-mod`, `/yaz`', inline: false },
                    { name: '🛠️ Bakım', value: '`/bakım`, `/karaliste`', inline: false }
                );
        }

        interaction.reply({ embeds: [embed], ephemeral: false });
    },
};
