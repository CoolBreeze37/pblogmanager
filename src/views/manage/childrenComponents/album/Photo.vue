<template>
  <div>
    <el-row type="flex"
            justify="center">
      <el-col :xs="24"
              :sm="22"
              :md="18"
              :lg="20">
        <el-card>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/albums">相册</a></el-breadcrumb-item>
            <el-breadcrumb-item><a :href="'/albums/'+albumId">{{$route.params.title}}</a></el-breadcrumb-item>
          </el-breadcrumb>
        </el-card>
        <br>
      </el-col>
    </el-row>
    <el-row :gutter="20"
            type="flex"
            justify="center">
      <el-col :xs="24"
              :sm="22"
              :md="18"
              :lg="20">
        <div class="photoWrapper">
          <div v-for="(photo,index) in photos"
               class="imgWrapper"
               :key="index"
               style="padding:0 10px 10px 10px">
            <el-image style="width: 148px; height: 148px;border-radius:6px"
                      :preview-src-list="srcList"
                      :src="$store.state.hostUrl+photo.path"
                      fit="cover"></el-image>
            <div class="imgWrapper-delete">
              <span @click="deletePhoto(photo.id)"><i class="el-icon-delete"></i></span>
            </div>
          </div>
          <el-upload :action="action"
                     list-type="picture-card"
                     :headers="headers"
                     :name="name"
                     :multiple="true"
                     :on-preview="handlePictureCardPreview">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%"
                 :src="dialogImageUrl"
                 alt="">
          </el-dialog>
        </div>
      </el-col>
    </el-row>
    <br>
    <el-row type="flex"
            justify="center">
      <el-col :xs="24"
              :sm="22"
              :md="18"
              :lg="20"
              style="text-align:center">
        <el-button type="primary"
                   size="default"
                   v-show="hasMore"
                   @click="loadMore">加载更多</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getPhotosData, deletePhotoData } from 'network/photos';
export default {
  data () {
    return {
      albumId: null,
      photos: [],
      srcList: [],
      action: '',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
      },
      name: "files",
      dialogVisible: false,
      dialogImageUrl: '',
      pageNumber: 1,
      pageSize: 5,
      hasMore: true
    }
  },
  methods: {
    // 加载更多
    loadMore () {
      this.getData()
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    deletePhoto (photoId) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePhotoData(this.albumId, photoId).then((res) => {
          if (res.status == 200) {
            this.$message({
              type: "success",
              message: '删除成功！'
            })
            this.getData()
          } else {
            this.$message({
              type: "error",
              message: '删除失败！'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    getData () {
      getPhotosData(this.albumId, this.pageNumber, this.pageSize).then((result) => {
        this.pageNumber = this.pageNumber + 1
        this.photos = this.photos.concat(result.data)
        var x_pagination = JSON.parse(result.headers["x-pagination"])
        this.hasMore = x_pagination.nextPageLink == null ? false : true
        this.photos.forEach(element => {
          this.srcList.push(this.$store.state.hostUrl + element.path)
        });
      });
    },
    fleshData () {
      this.photos = []
      for (var i = 1; i < this.pageNumber; i++) {
        console.log(i)
        getPhotosData(this.albumId, i, this.pageSize).then((result) => {
          console.log(result)
          this.photos = result.data
          var x_pagination = JSON.parse(result.headers["x-pagination"])
          this.hasMore = x_pagination.nextPageLink == null ? false : true
          this.photos.forEach(element => {
            this.srcList.push(this.$store.state.hostUrl + element.path)
          });
        });
      }
    },
  },
  created () {
    this.albumId = this.$route.params.id
    this.action = this.$store.state.hostUrl + 'api/albums/' + this.albumId + '/photos/multiplefiles'
    this.getData()
  },
}
</script>

<style>
.photoWrapper {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.imgWrapper {
  position: relative;
}
.imgWrapper-delete {
  width: 10px;
  height: 10px;
  color: rgb(145, 141, 158);
  position: absolute;
  top: 0px;
  right: 22px;
  text-align: center;
  font-size: 20px;
  transition: 0.2s;
  border-radius: 5px;
}
.imgWrapper-delete:hover {
  font-weight: 800;
  color: white;
}
.imgWrapper-delete span {
  cursor: pointer;
}
.el-upload--picture-card {
  margin-left: 10px;
}
</style>