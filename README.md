# Smart-Assistant
A Web Application for user to find the price of a used vehicle when buying or selling in Sri Lanka. It accepts some essential features of a vehicle as inputs such as model, brand name, mileage driven, fuel type, transmission type, capacity, year and provide the predicted the price as the output to the user. The base foundation for this system will be designed using supervised machine learning techniques such as Linear Regression, Random Forest, Decision Tree and Naive Bayes. Then by creating several models best one which has highest accuracy will be exported to a flask server and then through the web application, user can view the predicted price of the vehicle. The data set for creating the models will be taken from ikman.lk which is the best and most popular web site in Sri Lanka for selling ad buying used vehicles. Thus, for this project a data set that has been uploaded to Kaggle web site will be taken which has around 30,500 data. In addition to that web scrapping will be done using some techniques such as Microsoft Power Automate to extract data directly from ikman.lk rather than waiting for a data set because since this is a price prediction system, it needs to be changed at least once a week as the price is a factor that changes from day to day. Thus, for that purpose web scrapping can be done to modify the model with up-to date data set and for this system both the data set and web scrapping will be used to create the best model.

There are mainly 4 aims and its objectives can be presented in ‘Smart Assistant’.

01. To give a fair idea for the user of what factors could affect the price when buying a used vehicle
02. To enable user to search vehicle prices without any skepticism
03. To find available vehicle prices accurately easily at anytime
04. To give an idea for the user about alternative vehicles that is similar to the predicted price

Technologies: Python, React JS, Mongo DB, Flask, Bootstrap, Parsehub 
