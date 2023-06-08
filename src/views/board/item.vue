<template>
    <div style="margin-bottom: 80px;">
        <h1 class="p">Edit Lyrics</h1>
        <p class="p">작성한 가사를 언제든지 수정할 수 있어요!</p>
    </div>
    <v-containeer v-if="board">
        <div class="box">
            <div class="title">{{ board.title }}</div>
            <div class="body" v-html="nl2br(board.body)"></div>
        </div>

        <div class="text-center mt-2">
            <v-btn color="black" @click="moveModify">수정</v-btn>
            <v-btn color="white" @click="remove">삭제</v-btn>
        </div>
    </v-containeer>
</template>
<script>
export default {
    data() {
        return {
            board: null
        }
    },
    mounted() {
        this.$axios.post("/api/board/item", {
            boardNo: this.$route.params.id
        })
            .then(result => {
                if (result.data.result == "ok") {
                    this.board = result.data.board
                }
            })
    },
    methods: {
        remove() {
            if (!confirm("가사를 삭제하시겠습니까?")) {
                return
            }
            this.$axios.post("/api/board/remove", this.board)
                .then(result => {
                    if (result.data.result == "ok") {
                        this.$router.go(-1)
                    }
                })
        },
        moveModify() {
            this.$router.push("/board/modify/" + this.board.boardNo)
        },
        nl2br(input) {
            if (input) {
                return input.replace(/\n/g, "<br/>")
            }
        }
    }
}
</script>
<style scoped>
.title {
    font-size: 20px;
    font-weight: bold;
    border: solid;
    border-color: #e2e2e2;
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 10px;
}

.writer {
    text-align: right;
}

.view-count {
    text-align: right;
}

.body {
    min-height: 300px;
    background-color: #eee;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
}


.p {
    color: #333;
    text-align: center;
}

.box {
    margin-left: 200px;
    margin-right: 200px;
}
</style>