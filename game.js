
let game_color = ["green", "red", "yellow", "blue"];
let color_sequence = [];
let user_color_sequence = [];
let is_game = false;
let level = 0;

// one time event listener
document.addEventListener("keydown", function (event) {
    if (!is_game) {
        is_game = true;
        startSequenece();
    }
});

for (let i = 0; i < 4; i++) {
    document.querySelectorAll("div.btn")[i].addEventListener("click", function () {
        let button_press = this.getAttribute("id");
        press_button_make_sound(button_press);
        user_color_sequence.push(button_press);
        checkAnswer(user_color_sequence.length - 1);
    });
}

function startSequenece() {
    level++;

    document.querySelector("h1#level-title").innerHTML = "Level " + level;
    // empty user_color_sequence
    user_color_sequence = [];

    let random_num = Math.floor(4 * Math.random());
    // console.log(random_num);
    let random_color_choser = game_color[random_num];
    color_sequence.push(random_color_choser);
    // console.log(random_color_choser)
    press_button_make_sound(random_color_choser);
}

function checkAnswer(currentLevel) {
    console.log("color sequence: " + color_sequence);
    console.log("user typed    : " + user_color_sequence);

    if (color_sequence[currentLevel] === user_color_sequence[currentLevel]) {
        if (user_color_sequence.length === color_sequence.length) {
            setTimeout(function () {
                startSequenece();
            }, 1000);
        }
    } else {

        let wrong_audio = new Audio("sounds/wrong.mp3");
        wrong_audio.play();
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        game_restart();
    }
}

function press_button_make_sound(random_color_choser) {

    // code to press button
    let button_selector = "div." + random_color_choser;
    // console.log(button_selector);
    $(button_selector).addClass("pressed");
    setTimeout(function () {
        $(button_selector).removeClass("pressed");
    }, 50);

    // code to make sound
    let audio = new Audio("sounds/" + random_color_choser + ".mp3");
    audio.play();
}

function game_restart() {
    color_sequence = [];
    user_color_sequence = [];
    is_game = false;
    level = 0;
}