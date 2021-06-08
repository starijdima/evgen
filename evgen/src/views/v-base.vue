<template>
    <div class="base">
       <h2>База знаний</h2>
        <div class="content">
            <div class="base-container">
                <a download="test.docx" href="../assets/test1.docx">
                    <img :src="doc" alt="">
                    <p>Инструкция 1</p>
                </a>
                <a download="test.docx" href="../assets/test2.docx">
                    <img :src="doc" alt="">
                    <p>Инструкция 2</p>
                </a>
                <a download="test.docx" href="../assets/test3.docx">
                    <img :src="doc" alt="">
                    <p>Инструкция 3</p>
                </a>
            </div>
        </div>

    </div>
</template>

<script>

    import doc from '../assets/doc.png'

    export default {
        name: 'v-base',
        components: {

        },
        data(){
            return{
                doc
            }
        },


        methods:{

        }
    }
</script>
