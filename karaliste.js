const fs = require('fs');

module.exports = {
    data: {
        name: 'karaliste',
        description: 'Kara listeye kullanıcı ekler veya çıkarır.',
    },
    async execute(interaction) {
        const kullanıcı = interaction.options.getUser('kullanıcı');
        if (!kullanıcı) {
            return interaction.reply({ content: 'Lütfen bir kullanıcı belirtin.', flags: 64 });
        }

        let karaliste = [];
        try {
            const data = fs.readFileSync('./karaliste.json', 'utf-8');
            karaliste = JSON.parse(data);
            if (!Array.isArray(karaliste)) karaliste = [];
        } catch (err) {
            console.error('Kara liste dosyası okunurken hata oluştu:', err);
        }

        if (karaliste.includes(kullanıcı.id)) {
            return interaction.reply({ content: 'Bu kullanıcı zaten kara listede.', flags: 64 });
        }

        karaliste.push(kullanıcı.id);
        fs.writeFileSync('./karaliste.json', JSON.stringify(karaliste, null, 2));
        return interaction.reply({ content: `${kullanıcı.tag} kara listeye eklendi.` });
    },
};
