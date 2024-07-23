$.get("https://smileschool-api.hbtn.info/quotes")
.done((data) => {
    for (quote of data) {
        const slideContainer = $('<div class="container"></div>');
        const contentRow = $('<div class="row mx-auto align-items-center"></div>');
        const imgContainer = $('<div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center"></div>');
        const avatar = $(`<img src="${quote.pic_url}" class="d-block m-auto rounded-circle quote-avatar" alt="Carousel Pic ${quote.id}"/>`);
        imgContainer.append(avatar);
        const textContainer = $('<div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0"></div>');
        const text = $('<div class="quote-text"></div>');
        const quoteText = $(`<p class="text-white">${quote.text}</p>`);
        const quoteAuthor = $(`<h4 class="text-white font-weight-bold">${quote.name}</h4>`);
        const quoteTitle = $(`<span class="text-white">${quote.title}</span>`);
        text.append(quoteText, quoteAuthor, quoteTitle);
        textContainer.append(text);
        contentRow.append(imgContainer, textContainer);
        slideContainer.append(contentRow);
        $('#quotes-carousel').slick('slickAdd', slideContainer);
        console.log('new slide added!')
    }
})

$('.slick-carousel').slick({
    arrows: true,

});