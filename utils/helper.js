// utils/helpers.js - Yardımcı fonksiyonlar
const axios = require('axios');
const moment = require('moment');

class Helpers {
    // Hava durumu servisi (örnek - gerçek API anahtarı gerekir)
    static async getWeather(city) {
        try {
            // Gerçek uygulamada OpenWeatherMap gibi bir servis kullanılabilir
            // Bu örnek sadece gösterim amaçlı

            // Gerçek API anahtarı ile:
            // const response = await axios.get(
            //   `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`
            // );

            // Örnek veri döndür
            return {
                city: city,
                temperature: Math.floor(Math.random() * 30) + 5,
                condition: ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)],
                humidity: Math.floor(Math.random() * 50) + 30
            };
        } catch (error) {
            return null;
        }
    }

    // Disk kullanımı için renk kodu
    static getColorByUsage(percent) {
        if (percent < 50) return 'green';
        if (percent < 80) return 'yellow';
        return 'red';
    }

    // Boyut dönüşümü
    static formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    // Zaman damgası
    static timestamp() {
        return moment().format('YYYY-MM-DD HH:mm:ss');
    }
}

module.exports = Helpers;