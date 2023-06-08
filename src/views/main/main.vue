<template>
    <div class="image-scroll">
        <h1 class="p">MusicAi List</h1>
        <div class="image-container" ref="imageContainer">
            <button class="arrow-button left" @click="scrollLeft">&lt;</button>
            <div class="scroll-wrapper">
                <div class="image-item" v-for="(image, index) in visibleImages" :key="index">
                    <img :src="image.src" :alt="image.alt">
                </div>
            </div>
            <button class="arrow-button right" @click="scrollRight">&gt;</button>
        </div>
        <br>
        <br>
        <h3>Create your own music with AI</h3>
        <p>AI로 나만의 음악을 만들어 보세요</p>
        <button class="create-button" @click="toCreatePage">음악생성</button>

        <ul class="image-caption-list">
            <li v-for="(captionImage, index) in captionImages" :key="index" class="image-caption-item">
            </li>
        </ul>

        <div class="d-flex align-center flex-column">

            <v-card width="400" title="Eternal Melodies" subtitle="2022-05-28" text="create by.DY"></v-card>
            <br>
            <v-card width="400">
                <template v-slot:title>
                    Whispering Serenade
                </template>

                <template v-slot:subtitle>
                    2023-01-20
                </template>

                <template v-slot:text>
                    young
                </template>
            </v-card>
            <br>
            <v-card width="400">
                <v-card-item>
                    <v-card-title>Melancholic Dreams</v-card-title>
                    <v-card-subtitle>2023-05-12</v-card-subtitle>
                </v-card-item>
                <v-card-text>
                    - 다영 -
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'ImageScrollPage',
    data() {
        return {
            images: [
                { src: '001.png', alt: 'Image 1' },
                { src: '002.png', alt: 'Image 2' },
                { src: '003.png', alt: 'Image 3' },
                { src: '004.png', alt: 'Image 4' },
                { src: '005.png', alt: 'Image 5' },
                { src: '006.png', alt: 'Image 6' },
                { src: '007.png', alt: 'Image 7' },
                { src: '008.png', alt: 'Image 8' }
            ],
            visibleImages: [],
            startIndex: 0,
            endIndex: 3
        };
    },
    mounted() {
        this.updateVisibleImages();
    },
    methods: {
        updateVisibleImages() {
            this.visibleImages = this.images.slice(this.startIndex, this.endIndex + 1);
        },
        scrollLeft() {
            if (this.startIndex > 0) {
                this.startIndex--;
                this.endIndex--;
                this.updateVisibleImages();
            }
        },
        scrollRight() {
            if (this.endIndex < this.images.length - 1) {
                this.startIndex++;
                this.endIndex++;
                this.updateVisibleImages();
            }
        },
        toCreatePage() {
            this.$router.push('/composition');
        }
    }
};
</script>
  
<style>
.image-scroll {
    text-align: center;
}

.p {
    color: #333;
    text-align: center;
}

.image-container {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    margin-top: 50px;
    width: 1000px;
    margin: 0 auto;
    padding: 30px;
}

.scroll-wrapper {
    display: flex;
    justify-content: center;
    overflow-x: auto;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
}

.image-item {
    scroll-snap-align: center;
    flex: 0 0 auto;
    margin-right: 20px;
    transition: all 0.3s ease;
}

.image-item img {
    width: 200px;
    height: 200px;
    object-fit: cover;
}

.arrow-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 24px;
    background-color: transparent;
    border: none;
    color: #333;
    cursor: pointer;
    padding: 5px;
    z-index: 1;
}

.arrow-button.left {
    left: 30px;
    color: #333;
}

.arrow-button.right {
    right: 30px;
    color: #333;
}

.create-button {
    margin: 20px;
    width: 15%;
    background-color: black;
    border-radius: 5px;
    background-color: #333;
    color: white;
    font-weight: bold;
    text-align: center;
    margin: 50px;
}

.image-caption-list {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 10px;
    justify-items: center;
    max-width: 50%;
    margin: 0 auto;
    margin-top: 20px;

    list-style-type: none;
}

.image-caption-item {
    text-align: center;
}

.caption-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 10px;
}

.caption-text {
    font-weight: bold;
    margin-left: 10px;
}
</style>
  