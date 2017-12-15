module.exports = function f(app) {
    app.get('/poem', (req, res) => {
        const poem = ['У лукоморья дуб зелёный;',
            'Златая цепь на дубе том:',
            'И днём и ночью кот учёный',
            'Всё ходит по цепи кругом,',
            'Идёт направо  песнь заводит;',
            'Налево - сказку говорит.',
            'Там чудеса: там леший бродит,',
            'Русалка на ветвях сидит;',
            'Там на неведомых дорожках',
            'Следы невиданных зверей;',
            'Избушка там на курьих ножках',
            'Стоит без окон, без дверей;',
            'Там лес и дол видений полны;',
            'Там о заре прихлынут волны',
            'На брег песчаный и пустой,',
            'И тридцать витязей прекрасных',
            'Чредой из вод выходят ясных,',
            'И с ними дядька их морской;',
            'Там королевич мимоходом',
            'Пленяет грозного царя;',
            'Там в облаках перед народом',
            'Через леса, через моря',
            'Колдун несёт богатыря;',
            'В темнице там царевна тужит,',
            'А бурый волк ей верно служит;',
            'Там ступа с Бабою Ягой',
            'Идёт, бредёт сама собой,',
            'Там царь Кащей над златом чахнет;',
            'Там русский дух... там Русью пахнет!',
            'И там я был, и мёд я пил;',
            'У моря видел дуб зелёный;',
            'Под ним сидел, и кот учёный',
            'Свои мне сказки говорил.'];

        function getRandom(min, max, num) {
            return Math.floor(Math.floor(Math.random() * (max - min + 1) + min) / num) * num;
        }
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8',
        });
        const counter = 0;
        function Timer(count) {
            const temp = getRandom(1000, 5000, 1000);
            setTimeout(() => {
                res.write(`<p style="margin-left: 40%">${poem[count]}</p>`);
                if (count < poem.length - 1) {
                    console.log('count', count, '   poem.length ', poem.length);
                    Timer(count + 1);
                } else {
                    res.end();
                }
            }, temp);
        }

        Timer(counter);
    });
};
