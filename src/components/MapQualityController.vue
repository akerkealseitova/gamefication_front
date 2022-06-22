<template>
    <ul class="quality-options">
        <li class="list-button"><router-link to="/map/list">List</router-link></li>
        <li><a href="/map/quality/low">Map</a></li>
        <!-- <li><a href="/map/quality/low">Low Quality</a></li> -->
        <!-- <li><a href="/map/quality/high">HIgh Quality</a></li> -->
    </ul>
</template>

<script>

export default {
  components: {},
  data: () => ({ }),
  created(){
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
    .quality-options {
        background: #525151;

        max-height: 64px;
        min-width: 240px;
        width: 500px;

        margin: 0;

        position: absolute;
        top: 0;
        right: 0;

        display: none;
        align-items: center;
        box-sizing: border-box;
        border-top: 1px solid rgb(124, 122, 122);

        @media screen and (max-width: 850px ) {
            display: flex;
            width: calc(100% - 64px);
        }

        * {
            @media screen and (max-width: 850px) {
                width: calc(100% / 2);
            }
        }
        .list-button {
            display: none;
            @media screen and (max-width: 850px) {
                display: flex;
            }
        }
        li {
            height: 64px;
            text-align: center; 
            display: flex;
            align-items: center;
            justify-content: center;

            cursor: pointer;

            border-right: solid 0.7px rgb(124, 122, 122);
            &:last-child {
                border-right: none;
            }

            &:hover {
                background-color: rgb(34, 32, 32);
            }         

            @media screen and (max-width: 850px ) {
                padding: 0;
            }

            a {
                color: #fcfcfc;
                font-weight: bold;
                text-decoration: none;
                width: 100%;
                padding: 24px 8px;
                box-sizing: border-box;
                text-align: center;
                @media screen and (max-width: 850px ) {
                font-size: 16px;
                padding: 16px 8px;
                }
            }
        }
    }
</style>
