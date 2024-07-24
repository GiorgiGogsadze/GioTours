# Travel Company Platform: GioTours

> [!IMPORTANT] 
> **The Website is Deployed on Netlify https://giotours.netlify.app**

> [!NOTE]
> Pages to Visit: 
>* [Home](https://giotours.netlify.app) 
>* [New York Tour](https://giotours.netlify.app/tours/4) (e.g)
>* [About us and Reviews](https://giotours.netlify.app/about) 
>* [Sign up](https://giotours.netlify.app/signUp) 
>* [Log in](https://giotours.netlify.app/logIn) 
>* [Profile of Giorgi Gogsadze](https://giotours.netlify.app/users/95f2a99b-b721-4ef9-9467-cc7f79ec1642) (e.g)
>* [edit your account](https://giotours.netlify.app/editUser) (Protected Route, you can access it if you're logged in)
>* [Admin](https://giotours.netlify.app/admin) 
>* [Does not exist](https://giotours.netlify.app/jahsfkw) 

_The project was created for personal portfolio of Giorgi Gogsadze. The information contained in it is completely fictitious._

## Technical Side

### Front-end

The project utilizes the **React** JavaScript library powered by **Vite**. For seamless routing **React Router** is used, while **Tanstack React Query** handles API interactions. Additionally, the project makes use of wide range of React's build-in features, including lazy loading, Context API, Memoization, Custom hooks and Higher-Order Components.

### Back-end and database

The project’s backend relies on Supabase — an open-source database infrastructure built on PostgreSQL. Therefore primary focus was on database design rather than REST API development. Complex relationships between bookings, tours and accounts table, Indexes, custom functions (such as calculating the remaining time until a tour starts) and Triggers (e.g. for updating booking numbers that is stored generated column in accounts and tours tables) were implemented to make database consistent and highly performant.

Notably, Supabase serves as the storage for all images and plays a crucial role in user authentication and authorization.

## Description

The project is designed for a travel company providing a dynamic web application that enables users to search tours, book them and manage booked ones. Additionally, the platform empowers the company to seamlessly add, edit, or remove tours.

### For Users

The website displays a set of tours offered by the travel company allowing users to explore and then obtain detailed information about each of them. During the selection process, users can search by keywords, sort by price, popularity, start or end dates, and filter by preferred travel seasons. Each tour card contains important information, including location, time remaining in hours and price. 

The detailed tour page provides comprehensive information, including its plan, starting point, visit places, and duration. On this page, users can also track the dynamically updated countdown to the tour start time.

In order to book a tour, one needs to have an account.

> [!NOTE]
> There are 3 options for login:
> 1. Register on this site, and then log in using the username
> 2. Login using Google.
> 3. Login using Facebook. (It works only for developers, publishing needs business verification which in this case couldn't be done)

_The website uses **WebSocket** technology (specifically Supabase Realtime) to instantly reflect bookings across all devices where the user is logged in._

On the ‘About Us’ page, users find a customer reviews section. Those who have booked at least one tour can share their opinions about the company and rate it on a scale of up to 5 points. The average rating is also displayed in this section.

Additionally, users can explore profiles of reviewers, and view their booked tours (if access is not private). And from their own profile, they can hide or reveal their bookings, edit personal information, change profile picture and update the password.

### For Admin

*https://giotours.netlify.app/admin*

> [!NOTE]
> The Protection of Route is disabled, so you can visit and see the page without admin account, but due to database policies, your changes won't be saved. if you're intrested in checking functionality, send me email at gogsadzegeorge42@gmail.com

On the admin page, all tours are conveniently listed, allowed to edit or delete them, and in the case of an already completed tour, replace them with a new one. Additionally, Company can easily add new tours through this interface.