# HitBox Podcasting Host

This project is a podcast hosting site that holds user data including any episodes a user has favorited.
It is capable of displaying previews of podcasts as well as an in depth view of individual podcasts with any
user related information cross added. The site attempts to connect with a backend user data host via supabase but the 
backend logic has not yet been implemented to dynamically create new user tables. The site also has a built in audio player
to play the audio of any podcast a user should wish listen to. 

This project is being hosted on netlify over here: https://master--frolicking-concha-b560f1.netlify.app/
It also happens to retrieve the podcast information from netlify via links provided as this projects scope.

## Running the project
<a id="Running-the-project"></a>

In order to host this site locally you will need to: 
   -Clone the github repo (https://github.com/Alexander-Kubierske/ALEKUB082_pto2301_groupB_Alexander-Kubierske_DWACapstone)
   - Install all dependencies[¹](#Currently-installed-dependencies) by navigating to the project file and running npm install 
   - once all dependencies are installed to run a local copy run npm run dev

Please also be aware that this project relies on my supabase account and any information included in supaBaseConnector.tsx file should be 
replaced with your own connection should you clone this project. [supaBaseConnector.tsx](./src/services/supaBaseConnector.tsx)

## Acknowledgments
<a id="Acknowledgments"></a>

This project was developed in November 2023 as part of the DWA Part 2 course provided by Code Space. 
I would also like to take the time to thank the course coordinators of Code Space, my fellow class mates and friends for helping
me develop this project as well as I could as of submission date.

The work produced here has been inspired by sites like:
   - https://www.netflix.com/
   - https://music.youtube.com/
   - Youtube music mobile app

Here is a link to the rough planning of the app on figma
   - https://www.figma.com/file/qNlg2jn9cfDLgsv3okVGKH/DWA-Capstone?type=whiteboard&node-id=0%3A1&t=VC06Ymz309UaqkGk-1

## Contact information
<a id="Contact-information"></a>

github: https://github.com/Alexander-Kubierske


## Currently installed dependencies
<a id="Currently-installed-dependencies"></a>

Runtime Dependencies:

- @emotion/styled ^11.11.0
- @mui/icons-material ^5.14.16
- @mui/material ^5.14.16
- @mui/styled-engine-sc ^6.0.0-alpha.4
- @supabase/auth-ui-react ^0.4.6
- @supabase/auth-ui-shared ^0.1.8
- @supabase/supabase-js ^2.38.5
- fuse.js ^7.0.0
- react ^18.2.0
- react-dom ^18.2.0
- react-h5-audio-player ^3.9.0
- react-multi-carousel ^2.8.4
- react-router-dom ^6.18.0
- styled-components ^6.1.0
- zustand ^4.4.6

Development Dependencies:

- @types/react ^18.2.15
- @types/react-dom ^18.2.7
- @typescript-eslint/eslint-plugin ^6.0.0
- @typescript-eslint/parser ^6.0.0
- @vitejs/plugin-react ^4.0.3
- eslint ^8.45.0
- eslint-plugin-react-hooks ^4.6.0
- eslint-plugin-react-refresh ^0.4.3
- typescript ^5.0.2
- vite ^4.4.5

### License
<a id="License"></a>

MIT License

Copyright (c) [2023] [Alexander-Kubierske]