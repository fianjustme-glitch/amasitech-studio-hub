# Tahap 1: Build aplikasi Vite
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Tahap 2: Sajikan hasil build menggunakan server statis 'serve'
FROM node:22-alpine
WORKDIR /app
# Install package 'serve' secara global untuk menyajikan folder dist
RUN npm install -g serve
# Hanya salin folder hasil build (dist) dari tahap pertama
COPY --from=builder /app/dist ./dist
EXPOSE 8080
# Jalankan server statis di port 8080 dengan fitur Single Page Application (-s)
CMD ["serve", "-s", "dist", "-l", "8080"]
