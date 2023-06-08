<template>
    <div>
        <main>
            <div style="margin-bottom: 80px;">
                <h1 class="p">Music Creation</h1>
                <p class="p">AI로 나만의 음악을 만들어보세요!</p>
            </div>
            <section>
                <h2>음악 생성</h2>
                <hr>
                <br>
                <form @submit.prevent="generateMusic">
                    <label for="genre">장르</label>
                    <select name="genre" id="genre" v-model="selectedGenre">
                        <option value="pop">Pop</option>
                        <option value="rock">Rock</option>
                        <option value="classical">Classical</option>
                    </select>
                    <br>
                    <label for="mood">분위기</label>
                    <select name="mood" id="mood" v-model="selectedMood">
                        <option value="happy">Happy</option>
                        <option value="sad">Sad</option>
                        <option value="calm">Calm</option>
                    </select>
                    <br>
                    <div class="btn-container">
                        <button class="btn">생성</button>
                    </div>
                </form>
            </section>
            <section>
                <h2>생성된 음악</h2>
                <audio :src="generatedMusicUrl" controls></audio>
            </section>
            <div class="btn-container">
                <button class="btn" @click="toListPage">가사작성</button>
            </div>
        </main>
    </div>
</template>
  
<script>
import * as Tone from 'tone';

export default {
    name: 'AIComposerPage',
    data() {
        return {
            selectedGenre: 'pop',
            selectedMood: 'happy',
            generatedMusicUrl: ''
        };
    },
    methods: {
        generateMusic() {
            // 선택된 장르와 분위기에 따라 음악을 생성하고, generatedMusicUrl에 음악 파일 URL을 할당합니다.
            const synth = new Tone.Synth().toDestination();
            const note = this.selectedGenre === 'pop' ? 'C4' : this.selectedGenre === 'rock' ? 'E4' : 'A4';
            synth.triggerAttackRelease(note, '4n');

            const player = new Tone.Player().toDestination();
            const buffer = Tone.Offline(() => {
                player.load(synth.toMaster());
                player.start();
            }).then(buffer => {
                const blob = new Blob([Tone.Buffer.encodeWAV(buffer)], { type: 'audio/wav' });
                this.generatedMusicUrl = URL.createObjectURL(blob);
            });
        },
        toListPage() {
            this.$router.push('/board');
        }
    }
};
</script>
  
<style scoped>
body {
    font-family: Arial, sans-serif;
    margin: 0;
}

h1 {
    margin: 0;
}

main {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

section {
    margin-bottom: 40px;
}

form {
    display: flex;
    flex-direction: column;
}

label {
    margin-bottom: 15px;
}

select {
    border: 1px solid #000;
    border-radius: 5px;
    padding: 8px;
}

.btn {
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #333;
    color: #fff;
    cursor: pointer;
    width: 35%;
    font-weight: bold;
}

.btn:hover {
    background-color: #555;
}

.btn-container {
    text-align: center;
}

audio {
    width: 100%;
    margin-top: 20px;
}

hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border-width: 2px;
}

.p {
    color: #333;
    text-align: center;
}
</style>
  