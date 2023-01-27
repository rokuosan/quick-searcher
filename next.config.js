/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites(){
    return [
      {
        source: '/zenn',
        destination: 'https://zenn.dev/api/search'
      }
    ]
  }
}

module.exports = nextConfig
