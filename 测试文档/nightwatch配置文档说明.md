## nightwatch 基本设置

  | 变量名 | 类型 | 默认值 | 描述
  | ---- | ---- | ---- | ---- |
  | webdriver | object | null | 包含与WebDriver相关的配置选项 |
  | src_folders | string <br /> [] | '' | 需要测试的目录 |
  | test_settings | object | {} | 包含所有与测试相关的选项，并且可以包含多个环境 |
  | selenium | object | {} | 包含Selenium Server 相关配置选项。 从1.0开始， 只有在针对网络测试或云测试时才需要进行 selenium 测试 |
  | output_folder | string | tests_output | 测试报告文件的位置 |
  | custom_commands_path | string <br /> array | null | 自定义命令所在位置 |
  | custom_assertions_path | string <br /> array | null | 自定义断言位置 |
  | page_objects_path | string <br /> array | null | 加载页面对象文件的位置 |
  | globals_path | string | null | 外部全局模块的位置 |
  | live_output | boolean | false | 是否在并行运行时缓冲输出 |
  | disable_colors | boolean | false | 是否全局禁用 cli 输出的颜色 |
  | parallel_process_delay | int | 10 | 指定在并行模式下运行时启动子进程之间的延迟，以毫秒为单位 |
  | test_workers | boolean <br /> object | false | 是否并行运行单个测试文件 <br /> "test_workers": { "enabled": true, "workers": "auto" } |
  | test_runner | boolean <br /> object | false | 指定运行测试时要使用的测试运行器。 <br /> "test_runner": {"type": "mocha", "options": {"ui": "tdd"}} |
  | unit_tests_mode | boolean | false | 是否在单元测试模式下运行测试 |
