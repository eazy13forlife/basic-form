# Fetch Form
A clean and minimalist form

# Live Url
https://fetch-form-1.vercel.app/

## Images
### Desktop
![screencapture-fetch-form-1-vercel-app-2023-02-23-09_06_14](https://user-images.githubusercontent.com/72288176/220978918-646536af-e357-4af8-ba7c-ee8d0bfe1091.png)


## Technologies
* React
* Javascript
* SCSS
* JSX

## Notable Features
* Responsive
* Success and error indicators
* User can search for an option within the dropdown component
* Colorful and fun

## My Process
### Design
I created this design on figma first. I was going for a clean and minimalist design. In addition, I  wanted to add some animation, which I was able to do for the input labels, slightly moving them up when a user types. I also added some transitions for the changing of the color indicators and a press down effect on the submit button.

### Code
So normally, I have been using formik a lot recently for my projects, because I find it easy to use and it makes error handling in forms and creating custom form components pretty easy. But, I figured for this assignment there weren't too many form values to keep track of, and I wanted to make sure I show that I understand the nuts and bolts of how React works, so I just made use of simple react state. Doing this project vanilla, so to speak, reminded me how much I appreciate these form libraries and just libraries in general. Besides this, I tried to go for a clean project strutcture, comment appropriately and make frequent commits.


### Challenge
The main challenge I had was figuring out the animation of moving the input label up when an input field is focused or when there is a value in there. Initially, I was thinking maybe I could style a placeholder, but then I figured a label would actually be easier to style and just a more semantically correct element. But, the problem was since the label was above the input in terms of stacking context, clicking the label didn't focus the input. So, I made the input transparent, and gave it a higher z-index than label. And so at that point, clicking on the label was just clicking on the input and then I ran code that said when input has focus or has a value in there, add a class to the label that moves it up.
