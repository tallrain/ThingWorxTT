//Use ValueDisplay to show text
//DO NOT bind Custom Class

@keyframes marquee {
0% { left: 0; }
100% { left: -100%; }
}

.valuedisplay-container {
    animation: marquee 5s linear infinite;
    background-color: #eee;
    color: red;
}
