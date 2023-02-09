# Fetch Form
Take home test from Fetch Rewards

# Live Url
https://fetch-form-1.vercel.app/

## Images
### Desktop
![Screen Shot 2022-06-04 at 9 16 50 PM](https://user-images.githubusercontent.com/72288176/172034854-e0a8485d-482d-44c3-b3f2-0b60dedb5bc6.png)
![Screen Shot 2022-06-04 at 9 17 41 PM](https://user-images.githubusercontent.com/72288176/172034855-6b713e6c-14de-4569-84f4-26664b91522a.png)
### Mobile
![Screen Shot 2022-06-04 at 9 18 23 PM](https://user-images.githubusercontent.com/72288176/172034856-1ed85b4f-592a-402a-b798-78890aaad0a6.png)

## Technologies
* React
* Javascript
* SCSS
* JSX

## Notable Features
* Fully responsive
* Success and error indicators
* User can search for an option within the dropdown component
* Colorful and fun

## My Process
### Design
I created this design on figma first. I was going for a clean and minimalit design, and I also figured it would make sense to use Fetch company colors. In addition, I  wanted to add some animation, which I was able to do for the input labels, slightly moving them up when a user types. I also added some transitions for the changing of the color indicators and a press down effect on the submit button.

### Code
So normally, I have been using formik a lot recently for my projects, because I find it easy to use and it makes error handling in forms and creating custom form components pretty easy. But, I figured for this assignment there werent too many form values to keep track of, and I wanted to make sure I show that I understand the nuts and bolts of how React works, so I just made use of simple react state. Doing this project vanilla, so to speak, reminded me how much I appreciate these form libraries and just libraries in general. But I always believe a good understanding of the foundations is a must. Besides this, I tried to go for a clean project strutcture, comment appropriately and make frequent commits.


### Challenge
The main challenge I had was figuring out the animation of moving the input label up when an input field is focused or when there is a value in there. Initially, I was thinking maybe I could style a placeholder, but then I figured a label would actually be easier to style and just a more semantically correct element. But, the problem was since the label was above the input in terms of stacking context, clicking the label didn't focus the input. So, I made the input transparent, and gave it a higher z-index than label. And so at that point, clicking on the label was just clicking on the input and then I ran code that said when input has focus or has a value in there, add a class to the label that moves it up.
