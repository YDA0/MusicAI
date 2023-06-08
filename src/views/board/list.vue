<template>
    <v-container>
        <div style="margin-bottom: 80px;">
            <h1 class="p">Lyrics List</h1>
            <p class="p">작성한 가사를 모아서 목록으로 보관해보세요!</p>
        </div>
        <v-table fixed-header height="200px">
            <thead>
                <tr>
                    <th width="110px">
                        번호
                    </th>
                    <th class="text-center">
                        제목
                    </th>
                    <th width="110px">
                        작성자
                    </th>
                    <th width="120px">
                        작성일
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(board, key) in boardList" :key="key" @click="moveItem(board)">
                    <td>{{ board.boardNo }}</td>
                    <td class="text-center">{{ board.title }}</td>
                    <td>{{ board.user.name }}</td>
                    <td>{{ dateFormat(board.writeDate) }}</td>
                </tr>
            </tbody>
        </v-table>

        <div class="text-center">
            <v-btn color="white" class="mt-5" @click="moveWrite">가사작성</v-btn>
        </div>
    </v-container>
</template>
<script>
import moment from "moment"
import Pagination from "@/components/Pagination"
export default {
    components: {
        Pagination: Pagination
    },
    data() {
        return {
            page: 1,
            boardList: [],
            pagination: null
        }
    },
    mounted() {
        this.getBoardList()
    },

    methods: {
        dateFormat(date) {
            return moment(date).format("YYYY-MM-DD")
        },

        getBoardList() {
            this.$axios.post("/api/board/list", {
                page: this.page
            })
                .then(result => {
                    console.log(result.data)
                    this.boardList = result.data.list
                    this.pagination = result.data.pagination
                })
        },
        moveWrite() {
            this.$router.push("/board/write")
        },
        moveItem(board) {
            this.$router.push("/board/item/" + board.boardNo)
        }
    }
}
</script>

<style>
.text-center {
    padding-top: 8px;
    padding-bottom: 8px;
}

.p {
    color: #333;
    text-align: center;
}
</style>