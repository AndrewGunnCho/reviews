## Reviews

Our task is to build out and replace the API to support the Project Catwalk application. Our goal is to replace the existing API with a back end system that can support the full data set for the project and can scale to meet the demands of production traffic.

The Ratings and Reviews API for Project Catwalk is able to handle 600,000 requests per minute with an average of 15 ms response time and 0% error rate for one page  within the last 10% of the dataset.

![Single]:[single]

The API is also able to handle 600,000 requests per minute with an average of 1,263 ms response time and 3.9% error rate for the last 10% of the dataset.

![Randomized]:[randomized]

### Built With

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-20232A?style=for-the-badge&logo=postgresql&logoColor=blue)
![node.js](https://img.shields.io/badge/Node.js-20232A?style=for-the-badge&logo=nodedotjs&logoColor=green)
![Express](https://img.shields.io/badge/-Express-20232A?style=for-the-badge&logo=express&logoColor=yellow)
![NGINX](https://img.shields.io/badge/Nginx-20232A?style=for-the-badge&logo=nginx&logoColor=green)
![AMAZON AWS](https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)


## Getting Started

### Prerequisites

* npm
  ```sh
  npm install
  ```
* Run server
  ```sh
  npm run start
  ```
  
## Usage

* The get route for /reviews will return all the reviews for the given product_id. Product_id must be passed through the query paramater. Page and count can be added an as optional query to show a certain list of results (default 0) and/or limit the amount of results (default 5) respectively.

## Contact

Andrew Cho - [![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/andrew-cho-b06768218/)](https://www.linkedin.com/in/andrew-cho-b06768218/) [![GitHub: GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/AndrewGunnCho)](https://github.com/AndrewGunnCho)

Project Link: [https://github.com/rfp55-sdc-navi/reviews](https://github.com/rfp55-sdc-navi/reviews)

## Acknowledgments

* k6.io
* new relic
* loader.io
