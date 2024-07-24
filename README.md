# Travel Company Platform: GioTours

> [!IMPORTANT] 
> **The Website is Deployed on Netlify [https://giotours.netlify.app](https://giotours.netlify.app)**

> [!NOTE]
> Pages to Visit: 
>+[Home](https://giotours.netlify.app) 
>+[New York Tour](https://giotours.netlify.app/tours/4) (e.g)
>+[About us and Reviews](https://giotours.netlify.app/about) 
>+[Sign up](https://giotours.netlify.app/signUp) 
>+[Log in](https://giotours.netlify.app/logIn) 
>+[Profile of Giorgi Gogsadze](https://giotours.netlify.app/users/95f2a99b-b721-4ef9-9467-cc7f79ec1642) (e.g)
>+[edit your account](https://giotours.netlify.app/editUser) (Protected Route, you can access it if you're logged in)
>+[Admin](https://giotours.netlify.app/admin) 
>+[Does not exist](https://giotours.netlify.app/jahsfkw) 

_The project was created for personal portfolio of Giorgi Gogsadze. The information contained in it is completely fictitious._

## Technical Side

### Front-end

The project utilizes the **React** JavaScript library powered by **Vite**. For seamless routing **React Router** is used, while **Tanstack React Query** handles API interactions. Additionally, the project makes use of wide range of React's build-in features, including lazy loading, Context API, Memoization, Custom hooks and Higher-Order Components.

### Back-end and database

The project’s backend relies on Supabase—an open-source database infrastructure built on PostgreSQL. Therefore primary focus was on database design rather than REST API development. Complex relationships between bookings, tours and accounts table, Indexes, custom functions (such as calculating the remaining time until a tour starts) and Triggers (e.g. for updating booking numbers that is stored generated column in accounts and tours tables) made database more consistent and highly performant.

Notably, Supabase serves as the storage for all images and plays a crucial role in user authentication and authorization.

## Description

The project is designed for a travel company and delivers a dynamic web application, where users search, book and manage their tours. On the other hand the platform gives the company possibility to add, edit or remove tours.

### For Users

The website displays a set of tours offered by the travel company so that the user can first choose, and then get detailed information about each of them. During the selection process, users can search by keyword, sort by price, popularity, start or add date, and filter by the season they want to travel. Each tour card contains important information, including location, time remaining in hours and price. And the detailed page of the tour determines exactly what the tour is about, where it starts, what places are visited, or how long it lasts. On this page, users can track the automatically updated remaining time before the start of the tour. And finally book the tour.
In order to book a tour, one needs to have an account.

> [!NOTE]
> There are 3 options for Login:
> 1. Register on this site, and then log in using your username
> 2. Login using Google.
> 3. Login using Facebook. (It works only for developers, publishing needs business verification which in this case couldn't be done)

####

_With the use of WebSocket (Supabase Realtime), the booking is immediately reflected in all devices in which the account is opened._

In about us page, there is the customer reviews section, where those who have booked at least one tour, write their opinion about the company and rate it with a maximum of 5 points. The average rating of the company can be seen in this section.

### For Admin

*https://giotours.netlify.app/admin*

> [!NOTE]
> The Protection of Route is disabled, so you can visit and see the page without admin account, but due to database policies, your changes won't be saved. if you're intrested in checking functionality, send me email at gogsadzegeorge42@gmail.com
