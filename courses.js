function loading(status, element) {
    if (status === true) {
        console.log("loading...");
      $(`.${element}`).removeClass('d-none');
    } else {
      $(`.${element}`).addClass('d-none');
    }
}

function courseListInitializer(q="", topic="", sort="") {
    $.get(`https://smileschool-api.hbtn.info/courses?topic=${topic}&sort=${sort}&q=${q}`, () => {
        loading(true, 'loader');
    })
    .done((data) => {
        loading(false, 'loader');
        const count = data.courses.length;
        $('.video-count').text(`${count} videos`)
        $('#video-display').html("");
        for (video of data.courses) {
            // card container
            const videoContainer = $('<div class="col-12 col-sm-4 col-lg-3 d-flex justify-content-center"></div>');
            const videoCard = $('<div class="card"></div>');
            videoContainer.append(videoCard);

            // thumbnail
            const videoThumbnail = $(`<img src="${video.thumb_url}" class="card-img-top" alt="${video.title}"/>`);
            videoCard.append(videoThumbnail);

            // play button overlay
            const playButtonContainer = $('<div class="card-img-overlay text-center">');
            const playButton = $('<img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay mx-auto"/>');
            playButtonContainer.append(playButton);
            videoCard.append(playButtonContainer);

            // card body
            const cardBodyContainer = $('<div class="card-body"></div>');
            cardBodyContainer.append(`<h5 class="card-title font-weight-bold">${video.title}</h5>`, `<p class="card-text text-muted">${video['sub-title']}</p>`);

            // author info
            const authorContainer = $('<div class="creator d-flex align-items-center></div>');
            const authorAvatar = $(`<img src="${video.author_pic_url}" alt="${video.author} avatar" width="30px" class="rounded-circle"/>`);
            const authorName = $(`<h6 class="pl-3 m-0 main-color">${video.author}</h6>`);
            authorContainer.append(authorAvatar, authorName);
            cardBodyContainer.append(authorContainer);

            // video rating info
            const ratingContainer = $('<div class="info pt-3 d-flex justify-content-between"></div>');
            const ratingRow = $('<div class="rating"></div>');
            // rating loop
            console.log("adding rating");
            for (i = 1; i <= 5; i++) {
                let stars = "";
                let starRating = "";
                if (video.star >= i) {
                    stars = "images/star_on.png";
                    starRating = "star on";
                } else {
                    stars = "images/star_off.png";
                    starRating = "star off";
                }
                const starImg = $(`<img src="${stars}" alt="${starRating}" width="15px" class="d-inline-block"/>`);
                console.log(starImg);
                console.log(`Rating ${i}`);
                ratingRow.append(starImg);
            }
            const watchTime = $(`<span class="main-color">${video.duration}</span>`);
            ratingContainer.append(ratingRow, watchTime);
            cardBodyContainer.append(ratingContainer);
            videoCard.append(cardBodyContainer);
            $('#video-display').append(videoContainer);
        }
    })
}

$(document).ready(() => {

    courseListInitializer();

    const inputQ = $('#keyword-input');
    inputQ.data('previousValue', inputQ.val());
    inputQ.bind('propertychange change click keyup input paste', () => {
        if (inputQ.val() !== inputQ.data('previousValue')) {
            console.log("searching...")
            inputQ.data('previousValue', inputQ.val())
            courseListInitializer(inputQ.val(), inputTopic.val(), inputSort.val());
        }
    })
    const inputTopic = $('#topic-select');
    inputTopic.data('previousValue', inputTopic.val());
        inputTopic.bind('propertychange change', () => {
            if (inputTopic.val() !== inputTopic.data('previousValue')) {
                console.log("searching...")
                inputTopic.data('previousValue', inputTopic.val())
                courseListInitializer(inputQ.val(), inputTopic.val(), inputSort.val());
            }
        })
    const inputSort = $('#sort-select');

        inputSort.data('previousValue', inputSort.val());
        inputSort.bind('propertychange change', () => {
            if (inputSort.val() !== inputSort.data('previousValue')) {
                console.log("searching...")
                inputSort.data('previousValue', inputSort.val())
                courseListInitializer(inputQ.val(), inputTopic.val(), inputSort.val());
            }
        })

})

