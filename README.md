<start>
1. create a folder
2. npm init
3. node express install --save
4. git remote add origin [git repo HTTPS url]
   git add . > discard all changes
5. git commit --allow-empty -m "initial commit"
6. git push origin master --force

<issue>
1. clear web cash  
   => Ctrl + F5

1. Cannot GET /favicon.ico error
   no matter if you declared it or not, your browser will try to fetch favicon.ico at the root of your site to display it in your tab. You can add the code below to prevent auto-fetch.
   => <link rel="shortcut icon" href="#">

2. let iconStart = document.querySelector('.fas fa-play'); // null  
   => let iconStart = document.querySelector('.fa-play'); // work

3. why does it work only at times?????

4. function die() has an issue...
