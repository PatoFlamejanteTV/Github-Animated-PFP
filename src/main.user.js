// ==UserScript==
// @name         GitHub Animated Profile Picture
// @namespace    https://github.com/PatoFlamejanteTV
// @version      1.31
// @description  Replace GitHub profile picture with a custom image from the user's repository if the image exists
// @author       PatoFlamejanteTV
// @license MIT
// @match        *://github.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Check if URL is valid, mostly used when the Github's Raw Assets CDN goes down or something else
    function checkImage(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    }

    const profilePictureClasses = [
        'avatar mr-2 d-none d-md-block avatar-user',
        'avatar avatar-user width-full border color-bg-default',
        'avatar circle',
    ];

    const username = window.location.pathname.split('/').filter(Boolean)[0];
    const customImageUrl = `https://raw.githubusercontent.com/${username}/${username}/refs/heads/main/anim_pfp/pfp.gif`;

    console.log("Checking Image:", customImageUrl);

    checkImage(customImageUrl).then(exists => {
        if (exists) {
            // Change the PFP in the classes
            profilePictureClasses.forEach(profileClass => {
                // Seleciona os elementos de cada classe
                const profilePictures = document.getElementsByClassName(profileClass);

                // Converts to array & change
                Array.from(profilePictures).forEach(img => {
                    img.src = customImageUrl;
                    img.srcset = customImageUrl; // Adjust(?)
                });
            });
        } else {
            console.log("Animated PPF not found. :/");
        }
    });
})();
