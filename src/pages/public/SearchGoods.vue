<template>

  <el-container>
    <el-main>

      <el-col :span="7" v-for="(goods) in goodsList" :key="goods">
        <el-card>
          <h2>
            {{ goods.goodsName }}
          </h2>
          <el-divider>{{ goods.goodsIntroduction }}</el-divider>

          <div style="margin-top: 10px">
            <h3>¥{{ goods.goodsPrice }}</h3>
            <el-button type="danger"
                       @click="addOneOrderForm(goods.goodsId)" plain
                       style="border-radius: 0 !important;">
              立即购买
            </el-button>
            <el-button type="danger"
                       @click="addShopCart(goods.goodsId)" style="border-radius: 0 !important;">
              加入购物车
            </el-button>
          </div>
        </el-card>
      </el-col>

    </el-main>
  </el-container>
</template>

<script>

import {insertToShoppingCart} from '../../api/goods'
import {selectGoods} from '../../api/admin'

export default {
  name: "SearchGoods",
  watch: {
    $route: {
      handler() {
        let goodsName = this.$route.query.goodsName;
        selectGoods({
          goodsName: goodsName
        }).then(res => {
          this.goodsList = res.data.data.list;
          this.goodsLength = this.goodsList.length;
        });
      },
      deep: true,
    }
  },
  created() {
    let goodsName = this.$route.query.goodsName;
    selectGoods({
      goodsName: goodsName
    }).then(res => {
      this.goodsList = res.data.data.list;
      this.goodsLength = this.goodsList.length;
    });
  },

  methods: {
    addOneOrderForm(goodsId) {
      this.$router.push({path: 'addOneOrderForm', query: {goodsId: goodsId}})
    },

    addShopCart(goodsId) {
      insertToShoppingCart(JSON.stringify({
        goodsId: goodsId
      })).then(() => {
        this.$message({
          message: '已成功添加购物车！',
          type: 'success'
        });
      });
    },
  },
  data() {
    return {
      goodsList: [],
      goodsLength: 0
    }
  }

}
</script>

<style scoped>

</style>
