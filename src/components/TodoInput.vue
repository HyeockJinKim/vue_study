<template>
    <div class="inputBox shadow">
        <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo">
        <span class="addContainer" v-on:click="addTodo">
            <i class="fa fa-plus addBtn" aria-hidden="true"></i>
        </span>

        <Modal v-if="showModal" @close="showModal = false">
            <!--
              you can use custom content here to overwrite
              default content
            -->
            <h3 slot="header">
                경고!
                <i class="closeModalBtn fa fa-times" v-on:click="showModal = false" aria-hidden="true"></i>
            </h3>

            <div slot="body">
                값을 입력하세요
            </div>

            <div slot="footer">
                copyright: vue.js
            </div>
        </Modal>
    </div>
</template>

<script>
    import Modal from './common/Modal'

    export default {
        data() {
            return {
                newTodoItem: '',
                showModal: false,
            }
        },
        name: "TodoInput",
        methods: {
            addTodo() {
                if (this.newTodoItem === '') {
                    this.showModal = true;
                    return ;
                }
                this.$store.commit('addOneItem', this.newTodoItem);
                this.clearInput();
            },
            clearInput() {
                this.newTodoItem = '';
            }
        },
        components: {
            Modal,
        }
    }
</script>

<style scoped>
input:focus {
    outline: none;
}
.inputBox {
    background: white;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
}
.inputBox input {
    border-style: none;
    font-size: 0.9rem;
}
.addContainer {
    float: right;
    background: linear-gradient(to right, #6478FB, #8763FB);
    display: block;
    width: 3rem;
    border-radius: 0 5px 5px 0;
}
.addBtn {
    color: white;
    vertical-align: middle;
}
.closeModalBtn {
    color: #42b983;
}
</style>
