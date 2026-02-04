// 簡易認証システム
// 注意: これはクライアントサイドの簡易認証です
// 本番環境ではサーバーサイド認証を推奨します

const Auth = {
  // 認証設定
  config: {
    enabled: false,  // true にすると認証が有効になります
    password: 'itpassport2024',  // パスワードを設定
    sessionKey: 'itpassport_auth',
    sessionDuration: 24 * 60 * 60 * 1000  // 24時間
  },

  // 認証チェック
  requireAuth: function() {
    if (!this.config.enabled) {
      return true;
    }

    if (this.isAuthenticated()) {
      return true;
    }

    this.showLoginDialog();
    return false;
  },

  // 認証済みかチェック
  isAuthenticated: function() {
    const session = localStorage.getItem(this.config.sessionKey);
    if (!session) return false;

    try {
      const data = JSON.parse(session);
      if (Date.now() > data.expires) {
        localStorage.removeItem(this.config.sessionKey);
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  },

  // ログインダイアログ表示
  showLoginDialog: function() {
    document.body.innerHTML = '';

    const overlay = document.createElement('div');
    overlay.className = 'auth-overlay';

    overlay.innerHTML = `
      <div class="auth-dialog">
        <h2>認証が必要です</h2>
        <p>パスワードを入力してください</p>
        <input type="password" id="auth-password" placeholder="パスワード" autofocus>
        <button id="auth-submit">ログイン</button>
        <div id="auth-error" class="error" style="display:none;"></div>
      </div>
    `;

    document.body.appendChild(overlay);

    const input = document.getElementById('auth-password');
    const button = document.getElementById('auth-submit');
    const error = document.getElementById('auth-error');

    const attemptLogin = () => {
      if (input.value === this.config.password) {
        this.setSession();
        location.reload();
      } else {
        error.textContent = 'パスワードが正しくありません';
        error.style.display = 'block';
        input.value = '';
        input.focus();
      }
    };

    button.addEventListener('click', attemptLogin);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') attemptLogin();
    });
  },

  // セッション設定
  setSession: function() {
    const data = {
      authenticated: true,
      expires: Date.now() + this.config.sessionDuration
    };
    localStorage.setItem(this.config.sessionKey, JSON.stringify(data));
  },

  // ログアウト
  logout: function() {
    localStorage.removeItem(this.config.sessionKey);
    location.reload();
  }
};
