<template>
  <div>
    <el-button
      class="btn"
      type="primary"
      icon="el-icon-caret-top"
      @click="visible = true"
      >DevTools</el-button
    >
    <el-drawer
      :visible.sync="visible"
      :with-header="false"
      direction="btt"
      size="70%"
    >
      <el-tabs type="card">
        <el-tab-pane label="注册中心" />
      </el-tabs>
      <div style="padding: 0 20px">
        <el-form ref="app" :model="app" inline>
          <el-form-item label="name" prop="name" required>
            <el-input v-model="app.name" />
          </el-form-item>
          <el-form-item label="entry" prop="entry" required>
            <el-input v-model="app.entry" />
          </el-form-item>
          <el-form-item label="activeRule" prop="activeRule" required>
            <el-input v-model="app.activeRule" />
          </el-form-item>
          <el-button @click="addApp" type="primary">新增</el-button>
        </el-form>

        <el-table
          :data="apps"
          border
          fit
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column align="center" label="name" width="100">
            <template slot-scope="{ row }">
              <template v-if="row.edit">
                <el-input v-model="row.name" />
              </template>
              <span v-else>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="entry">
            <template slot-scope="{ row }">
              <template v-if="row.edit">
                <el-input v-model="row.entry" />
              </template>
              <span v-else>{{ row.entry }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="activeRule">
            <template slot-scope="{ row }">
              <template v-if="row.edit">
                <el-input v-model="row.activeRule" />
              </template>
              <span v-else>{{ row.activeRule }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作" width="220">
            <template slot-scope="{ row, $index }">
              <template v-if="row.edit">
                <el-button
                  type="success"
                  icon="el-icon-circle-check-outline"
                  @click="confirmEdit(row)"
                >
                  确认
                </el-button>
              </template>
              <template v-else>
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  @click="row.edit = true"
                />
                <el-button
                  type="warning"
                  icon="el-icon-refresh-left"
                  @click="resetConfig(row, $index)"
                />
                <el-button type="danger" icon="el-icon-delete" />
              </template>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="center">
          <el-button @click="save" type="success">应用</el-button>
          <!-- <el-button @click="reset" type="warning">重置</el-button> -->
        </el-row>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { RemoteAppsConfig } from "./configs";

export default {
  name: "App",
  props: ["localAppsConfig"],
  data() {
    return {
      visible: false,
      app: {},
      apps: [],
    };
  },
  created() {
    this.apps = this.localAppsConfig.get();
  },
  methods: {
    async addApp() {
      await this.$refs.app.validate();
      if (this.apps.some((app) => app.name === this.app.name)) {
        this.$messages.warning("应用名称不能重复!");
        return;
      }
      this.apps.push({
        ...this.app,
        edit: false,
      });
      this.$refs.app.resetFields();
    },
    confirmEdit(row) {
      row.edit = false;
    },
    resetConfig(config, index) {
      const remoteAppsConfig = RemoteAppsConfig.get();
      const app = remoteAppsConfig.find(
        app => app.name === config.name
      );
      this.apps.splice(index, 1, app);
    },
    save() {
      this.localAppsConfig.set(this.apps);
      window.location.reload();
    },
  },
};
</script>

<style>
.btn {
  position: absolute;
  bottom: 5px;
  right: 5px;
}
</style>
