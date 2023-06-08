<template>
    <v-container class="box">
        <div style="margin-bottom: 80px;">
            <h1 class="p">Write Lyrics</h1>
            <p class="p">만든 음악에 어울릴 가사를 작성해보세요!</p>
        </div>
        <v-text-field @keyup.enter="submit" ref="title" v-model="board.title" label="제목"
            variant="underlined"></v-text-field>
        <v-textarea ref="body" v-model="board.body" label="가사" variant="underlined"></v-textarea>
        <div class="text-center">
            <v-btn color="white" @click="submit">작성완료</v-btn>
        </div>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            board: {
                title: "",
                writer: "",
                body: ""
            }
        }
    },
    methods: {
        submit() {
            if (this.board.title == "") {
                alert("제목을 입력하세요")
                this.$refs.title.focus()
                return
            }

            if (this.board.body == "") {
                alert("내용을 입력하세요")
                this.$refs.body.focus()
                return
            }

            //TODO : 서버에 데이터 전송
            this.$axios.post("/api/board/write", this.board)
                .then(result => {
                    if (result.data.result == "ok") {
                        this.$router.replace("/board/item/" + result.data.item.boardNo)
                    }
                    else {
                        if (result.data.message) {
                            window.alert(result.data.message)
                        }
                    }
                })

            this.$router.replace("/board")
        }
    }
}
</script>

<style>
.box {
    margin-top: 30px;
}

.p {
    color: #333;
    text-align: center;
}
</style>