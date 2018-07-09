$(document).ready(function () {

    var getDate = function () {

        var d = new Date(), // получаем текущую дату
            day = d.getDate(),
            hrs = d.getHours(),
            min = d.getMinutes(),
            sec = d.getSeconds(),
            month = d.getMonth(),
            year = d.getFullYear();

        var monthArray = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");

        if (day <= 9) day = "0" + day;

        var actualDate = monthArray[month] + "/" + day + "/" + year;

        return actualDate;
    }

    //счётчик твитов
    var countTweets = function () {
        var tweetCounter = $('.tweet-card').length;
        console.log(tweetCounter);
        $('#tweetsCounter').text(tweetCounter);
    }

    //счётчик читателей
    var count = 0;
    $("#btn-subscribe").click(function () {
        count++;
        $('#counter').html(+count);
        $('#btn-subscribe').prop('disabled', true);
        showNotify('done');
    });

    function showNotify(type) {
        var $notifyNew = $('<div class="alert alert-success" role="alert">Twitt success</div>'),
            $notifyDone = $('<div class="alert alert-success" role="alert">Subscribe success</div>');

        switch (type) {
            case 'new':
                $notifyBlock = $notifyNew;
                break;
            case 'done':
                $notifyBlock = $notifyDone;
                break;
        }
         // if ( $('#notifyHolder .alert') ) {}
        $('#notifyHolder .alert').fadeOut();
        $notifyBlock.hide();
        $('#notifyHolder').append($notifyBlock);
        $notifyBlock.fadeIn();
        setTimeout(function () {
            $notifyBlock.fadeOut();
            setTimeout(function () {
                $notifyBlock.remove();
            }, 1500);
        }, 1500);
    }

    //обработчик ссылок
    var wrapURLs = function (text, new_window) {
        var url_pattern = /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/ig;
        var target = (new_window === true || new_window == null) ? '_blank' : '';

        return text.replace(url_pattern, function (url) {
            var protocol_pattern = /^(?:(?:https?|ftp):\/\/)/i;
            var href = protocol_pattern.test(url) ? url : 'http://' + url;
            return '<a href="' + href + '" target="' + target + '">' + url + '</a>';
        });
    };


    //созданиен твита 
    var createTweet = function (date, text) {
        var $tweetBox = $('<div class="card tweet-card">'); //создание виртуальной карточки
        var $tweetDate = $('<div class="tweet-date">').text(date); //создание даты в карточке 
        var $tweetText = $('<div class="tweet-text">').html(wrapURLs(text)).wrapInner('<p></p>'); // создаём контент с твитом и оборачивам в парграф и обрабатываем текст

        /**     // меняем размер шрифта (выключено)
        var additionalClassName;
        if ( text.length < 100 ) {
            additionalClassName = 'font-size-large';
        } else if ( text.length > 150 ) {
            additionalClassName = 'font-size-small';
        } else {
            additionalClassName = 'font-size-normal';
        }
        $tweetText.addClass(additionalClassName);
        */

        $tweetBox.append($tweetDate).append($tweetText); // получаем разметку твита с датой и текстом твита
        $('#tweetsList').prepend($tweetBox); // добавляем на страницу
        countTweets();
    }

    //база данных на js
    var tweetsBase = [{
            date: "05/09/2018",
            text: "I found a good site -> https://getbootstrap.com"
        },
        {
            date: "06/09/2018",
            text: "Resistance is power, Pasha we're with you!"
        },
        {
            date: "07/09/2018",
            text: "The government is watching us,be careful."
        }
    ];

    tweetsBase.forEach(function (tweet) {
        createTweet(tweet.date, tweet.text);
    });

    //форма

    $('#postNewTweet').on('submit', function (e) {
        e.preventDefault(); // отменяем отправку формы
        var tweetText = $('#tweetText').val(); //получаем текст от пользователя
        createTweet(getDate(), tweetText);
        showNotify('new');









    });
});