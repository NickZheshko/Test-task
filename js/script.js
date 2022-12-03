window.addEventListener('DOMContentLoaded', () => {
    const priceItems = document.querySelectorAll('.price_item');
    const title = document.querySelector('.title'),
        header = document.querySelector('header'),
        features = document.querySelector('.features'),
        btn = document.querySelector('.button'),
        cancel = document.querySelector('.cancel'),
        footer = document.querySelector('.footer');

    let language = window.navigator.language;
    let location = language.substr(0, 2);

    let render = function (fileName) {
        fetch(`/Localizations/${fileName}`)
            .then(data => data.json())
            .then(json => {
                let rest = document.createElement('a');
                rest.innerHTML = `<a class="restore" href="#">${json[`Restore`]}</a>`;
                header.appendChild(rest);
                title.innerHTML = `<h1>${json[`Unlimited Access<br>to All Features`]}</h1>`;
                features.innerHTML = `
            <span class="features_item">${json[`Unlimited documents`]}</span>
            <span class="features_item">${json[`Count mode`]}</span>
            <span class="features_item">${json[`Text recognition (OCR)`]}</span>`;
                priceItems[0].innerHTML = `
            <div class="price_item_period">${json[`Monthly`]}</div>
            <div class="price_item_cost">$9.99 <br><span>${json[`<strong>{{price}}</strong><br>per month`]}</span></div>
            <div class="price_item_free">${json[`3 DAYS FREE`]}</div>
            <div class="price_item_month">$9.99 ${json[`{{price}}/month`]}</div>`

                priceItems[1].innerHTML = `
            <div class="price_item_period">${json[`Annually`]}</div>
            <div class="price_item_cost">$19.99 <br><span>${json[`<strong>{{price}}</strong><br>per year`]}</span></div>
            <div class="price_item_free">${json[`MOST POPULAR`]}</div>
            <div class="price_item_month">$1.66 ${json[`{{price}}/month`]}</div>`;

                btn.innerHTML = `<a href="#">${json[`Continue`]}</a>`;
                cancel.innerHTML = `<a href="#">${json[`Auto-renewable. Cancel anytime.`]}</a>`;
                footer.innerHTML = `
            <a href="#">${json[`Terms of Use`]}</a>
            <a href="#">${json[`Privacy Policy`]}</a> `;

                priceItems[0].classList.add('active');

                const changePriceItem = function (index) {
                    if (index === 0) {
                        priceItems[index].classList.add('active');
                        priceItems[index + 1].classList.remove('active');

                    } else {
                        priceItems[index].classList.add('active');
                        priceItems[index - 1].classList.remove('active');
                    }
                }

                priceItems[0].addEventListener('click', () => {
                    priceItems[0].classList.add('active');

                    let index = 0;
                    changePriceItem(index);
                })

                priceItems[1].addEventListener('click', () => {
                    priceItems[1].classList.add('active');

                    let index = 1;
                    changePriceItem(index);
                })
            });

    }

    switch (location) { 
        case "es":
            render('es.json')
        break;
        case "fr":
            render('fr.json')
        break;
        case "ja":
            render('ja.json')
        break;
        case "nl":
            render('nl.json')
        break;
        case "ru":
            render('ru.json')
        break;
        case "zh":
            render('zh.json')
        break;
        default:
            render('en.json')
      } 

      btn.addEventListener('click', () => {
        if (priceItems[0].classList.contains('active')) {
            window.location.href = 'https://apple.com/';
        } else {
            window.location.href = 'https://google.com/';
        }
      });

});


