/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'localhost', 
            'tactical-movies.s3.us-east-1.amazonaws.com', 
            'https://tactical-movies-api.vercel.app/'
        ],
    },
}

module.exports = nextConfig
