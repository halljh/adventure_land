/*
 * Shamelessly stolen and edited from the below:
 * @author	D4ddy-LiLd4rk
 * @source	https://github.com/D4ddy-LiLd4rk/AdventureLand
 */

const baseURL = "https://raw.githubusercontent.com/halljh/adventure_land/master/";

const allFiles = [
    "1_main.js",
    "2_requires.js",
    "3_update.js",
    "10_warrior.js",
    "11_ranger.js",
    "12_priest.js",
    "13_rogue.js",
    "14_mage.js",
    "15_merchant.js",
    "20_constants.js",
    "30_runners.js",
    "31_potions.js",
    "40_party.js"
];

function updateCode() {
    parent.api_call("list_codes", {
        callback: function () {
            game_log("Updating from GitHub...");
            for (let file of allFiles) {
                let request = new XMLHttpRequest();
                request.open("GET", baseURL + file);
                request.onreadystatechange = function () {
                    if (request.readyState === 4 && request.status === 200) {
                        let codeObject = getCodeObject(file);
                        let data = {
                            name: codeObject.name,
                            slot: codeObject.slot,
                            code: request.responseText
                        };
                        parent.api_call("save_code", data);
                    }
                };
                request.send();
            }
        }
    });
}

function getCodeObject(file) {
    let codeObject;

    let arr = file.substring(0, file.length - 3).split("_");

    codeObject = {
        slot: arr[0],
        name: arr[1]
    };

    return codeObject;
}