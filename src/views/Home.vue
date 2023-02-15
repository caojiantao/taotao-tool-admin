<template>
  <el-row justify="space-between">
    <el-col :span="7" v-for="(rank, i) in ranks" :key="i">
      <el-card shadow="always" :header="rank.title">
        <div class="tt-card-content">
          <div class="tt-card-item" v-for="(item, j) in rank.items" :key="j">
            <a :href="item.url" target="_blank">{{ item.desc }}</a>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive, onMounted } from "vue";

import $http from "@/http";

const ranks = reactive([]);

onMounted(() => {
  getRankWeibo();
  getRankBaidu();
  getRankZhihu();
});

const getRankWeibo = () => {
  const url =
    "https://m.weibo.cn/api/container/getIndex?containerid=106003type%3D25%26filter_type%3Drealtimehot";
  const onSuccess = (data) => {
    let json = JSON.parse(data);
    let list = json.data.cards[0].card_group;
    let rank = {
      icon: "",
      title: "微博实时热点，每分钟更新一次",
      items: [],
    };
    list
      .filter((item) => item.desc_extr)
      .forEach((item, index) => {
        rank.items.push({
          index: index,
          desc: item.desc,
          url: item.scheme,
        });
      });
    ranks.push(rank);
  };
  getRank(url, onSuccess);
};

const getRankBaidu = () => {
  const url = "https://top.baidu.com/api/board?tab=realtime";
  const onSuccess = (data) => {
    let json = JSON.parse(data);
    let list = json.data.cards[0].content;
    let rank = {
      icon: "",
      title: "百度热搜榜",
      items: [],
    };
    list.forEach((item, index) => {
      rank.items.push({
        index: index,
        desc: item.word,
        url: item.url,
      });
    });
    ranks.push(rank);
  };
  getRank(url, onSuccess);
};

const getRankZhihu = () => {
  const url = "https://api.zhihu.com/topstory/hot-list";
  const onSuccess = (data) => {
    let json = JSON.parse(data);
    let list = json.data;
    let rank = {
      icon: "",
      title: "知乎热榜",
      items: [],
    };
    list.forEach((item, index) => {
      rank.items.push({
        index: index,
        desc: item.target.title,
        url: `https://www.zhihu.com/question/${item.target.id}`,
      });
    });
    ranks.push(rank);
  };
  getRank(url, onSuccess);
};

const getRank = (url, onSuccess) => {
  url = "/httpProxy/doExecute?targetUrl=" + encodeURIComponent(url);
  $http({
    url: url,
  }).then((data) => {
    onSuccess(data);
  });
};
</script>

<style scoped>
.tt-card-content {
  height: 500px;
  overflow-y: auto;
}

.tt-card-item {
  padding: 0.3rem 0;
}

.tt-card-item a {
  line-height: 1.5rem;
  text-decoration: none;
  color: black;
}

.tt-card-item a:hover {
  text-decoration: underline;
  color: blue;
}
</style>
