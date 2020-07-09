<template>
  <div>
    <el-dialog title="分配权限" :visible="dialogVisible" width="50%" :before-close="handleClose">
      <el-tree
        ref="rightsTree"
        :data="rightsData"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        :default-expand-all="true"
        :default-checked-keys="selectRights"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { reqRights, regAllotRole } from "network/api";
export default {
  name: "RoleListAllot",
  props: {
    //当前角色信息
    roleInfo: {
      type: Object
    },
    //更新页面数据
    getRolesList: {
      type: Function
    }
  },
  data() {
    return {
      dialogVisible: false,
      //配置显示信息
      defaultProps: {
        label: "authName",
        children: "children"
      },
      //所有权限
      rightsData: [],
      //选中的权限列表
      selectRights: []
    };
  },
  created() {
    this.getRolesTree();
  },
  methods: {
    //点击 xx 取消
    handleClose() {
      this.$emit("clearRoleInfo");
      this.dialogVisible = false;
      this.selectRights = [];
      //修改已选选项为空后退出
      this.$nextTick(() => {
        this.$refs.rightsTree.setCheckedKeys([]);
      });
    },
    //获取树状权限列表
    async getRolesTree() {
      const result = await reqRights("tree");
      if (result.meta.status !== 200)
        return this.$message.error(result.meta.msg);
      this.rightsData = result.data;
    },
    //递归查询id
    getRightsId(obj, arr) {
      if (!obj.children) return arr.push(obj.id);
      obj.children.forEach(item => {
        this.getRightsId(item, arr);
      });
    },
    //修改权限
    async submitRights() {
      //当前选中和半叶子选择的数组
      const { getCheckedKeys, getHalfCheckedKeys } = this.$refs.rightsTree;
      const rids = [...getCheckedKeys(), ...getHalfCheckedKeys()].join(",");
      const result = await regAllotRole(this.roleInfo.id, rids);
      if (result.meta.status !== 200)
        return this.$message.error(result.meta.msg);
      this.$message.success("分配成功");
      this.dialogVisible = false;
      this.getRolesList();
    }
  },
  watch: {
    roleInfo(newRoleInfo) {
      this.getRightsId(newRoleInfo, this.selectRights);
    }
  }
};
</script>

<style lang="less" scoped>
</style>