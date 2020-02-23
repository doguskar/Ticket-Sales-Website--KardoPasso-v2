using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Kardo20.Models.DB
{
    public partial class kardoContext : DbContext
    {
        public kardoContext()
        {
        }

        public kardoContext(DbContextOptions<kardoContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Authentications> Authentications { get; set; }
        public virtual DbSet<Emails> Emails { get; set; }
        public virtual DbSet<Passwords> Passwords { get; set; }
        public virtual DbSet<Permisions> Permisions { get; set; }
        public virtual DbSet<PhoneNumbers> PhoneNumbers { get; set; }
        public virtual DbSet<Profils> Profils { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=.;Database=kardo;Trusted_Connection=True;MultipleActiveResultSets=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Authentications>(entity =>
            {
                entity.HasKey(e => e.AuthenticationId);

                entity.ToTable("authentications");

                entity.Property(e => e.AuthenticationId).HasColumnName("authenticationId");

                entity.Property(e => e.AttemptedPassword)
                    .IsRequired()
                    .HasColumnName("attemptedPassword")
                    .HasMaxLength(255);

                entity.Property(e => e.AttemptedResult).HasColumnName("attemptedResult");

                entity.Property(e => e.AuthenticationDate)
                    .HasColumnName("authenticationDate")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getutcdate())");

                entity.Property(e => e.City)
                    .HasColumnName("city")
                    .HasMaxLength(50);

                entity.Property(e => e.Country)
                    .HasColumnName("country")
                    .HasMaxLength(50);

                entity.Property(e => e.Hostname)
                    .HasColumnName("hostname")
                    .HasMaxLength(255);

                entity.Property(e => e.IpAddress)
                    .HasColumnName("ipAddress")
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.Location)
                    .HasColumnName("location")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Authentications)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_authentications_users");
            });

            modelBuilder.Entity<Emails>(entity =>
            {
                entity.HasKey(e => e.EmailId);

                entity.ToTable("emails");

                entity.Property(e => e.EmailId).HasColumnName("emailId");

                entity.Property(e => e.Activated).HasColumnName("activated");

                entity.Property(e => e.ActivatedDate)
                    .HasColumnName("activatedDate")
                    .HasColumnType("datetime");

                entity.Property(e => e.ActivationKey)
                    .HasColumnName("activationKey")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ActivationKeyDate)
                    .HasColumnName("activationKeyDate")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getutcdate())");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(255);

                entity.Property(e => e.NonUsed).HasColumnName("nonUsed");

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Emails)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_emails_users");
            });

            modelBuilder.Entity<Passwords>(entity =>
            {
                entity.HasKey(e => e.PasswordId);

                entity.ToTable("passwords");

                entity.Property(e => e.PasswordId).HasColumnName("passwordId");

                entity.Property(e => e.CreatedDate)
                    .HasColumnName("createdDate")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getutcdate())");

                entity.Property(e => e.NonUsed).HasColumnName("nonUsed");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Passwords)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_passwords_users");
            });

            modelBuilder.Entity<Permisions>(entity =>
            {
                entity.HasKey(e => e.RoleId)
                    .HasName("PK_permisions_1");

                entity.ToTable("permisions");

                entity.Property(e => e.RoleId).HasColumnName("roleId");

                entity.Property(e => e.CanEditPermissions).HasColumnName("can_edit_permissions");

                entity.Property(e => e.CanEnterPagePanel).HasColumnName("can_enter_pagePanel");

                entity.Property(e => e.CanModifyUsers).HasColumnName("can_modify_users");

                entity.HasOne(d => d.Role)
                    .WithOne(p => p.Permisions)
                    .HasForeignKey<Permisions>(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_permisions_roles");
            });

            modelBuilder.Entity<PhoneNumbers>(entity =>
            {
                entity.HasKey(e => e.PhoneNumberId);

                entity.ToTable("phoneNumbers");

                entity.Property(e => e.PhoneNumberId).HasColumnName("phoneNumberId");

                entity.Property(e => e.Activated).HasColumnName("activated");

                entity.Property(e => e.ActivatedDate)
                    .HasColumnName("activatedDate")
                    .HasColumnType("datetime");

                entity.Property(e => e.ActivationKey)
                    .HasColumnName("activationKey")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ActivationKeyDate)
                    .HasColumnName("activationKeyDate")
                    .HasColumnType("datetime");

                entity.Property(e => e.Country)
                    .IsRequired()
                    .HasColumnName("country")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.NonUsed).HasColumnName("nonUsed");

                entity.Property(e => e.PhoneNumber)
                    .IsRequired()
                    .HasColumnName("phoneNumber")
                    .HasMaxLength(10)
                    .IsFixedLength();

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.PhoneNumbers)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_phoneNumbers_users");
            });

            modelBuilder.Entity<Profils>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.ToTable("profils");

                entity.Property(e => e.UserId)
                    .HasColumnName("userId")
                    .ValueGeneratedNever();

                entity.Property(e => e.BornDate)
                    .HasColumnName("bornDate")
                    .HasColumnType("date");

                entity.Property(e => e.LanguagePreference)
                    .HasColumnName("languagePreference")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasMaxLength(100);

                entity.Property(e => e.ProfilPic)
                    .HasColumnName("profilPic")
                    .HasColumnType("ntext");

                entity.Property(e => e.Surname)
                    .HasColumnName("surname")
                    .HasMaxLength(50);

                entity.HasOne(d => d.User)
                    .WithOne(p => p.Profils)
                    .HasForeignKey<Profils>(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_profils_users");
            });

            modelBuilder.Entity<Roles>(entity =>
            {
                entity.HasKey(e => e.RoleId);

                entity.ToTable("roles");

                entity.Property(e => e.RoleId)
                    .HasColumnName("roleId")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.RoleName)
                    .HasColumnName("roleName")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.ToTable("users");

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.Property(e => e.CreatedDate)
                    .HasColumnName("createdDate")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getutcdate())");

                entity.Property(e => e.DeletedById).HasColumnName("deletedById");

                entity.Property(e => e.DeletedDate)
                    .HasColumnName("deletedDate")
                    .HasColumnType("datetime");

                entity.Property(e => e.DeletedFlag).HasColumnName("deletedFlag");

                entity.Property(e => e.ForgottenDate)
                    .HasColumnName("forgottenDate")
                    .HasColumnType("datetime");

                entity.Property(e => e.ForgottenKey)
                    .HasColumnName("forgottenKey")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.LastModifiedById).HasColumnName("lastModifiedById");

                entity.Property(e => e.LastModifiedDate)
                    .HasColumnName("lastModifiedDate")
                    .HasColumnType("datetime");

                entity.Property(e => e.Pin)
                    .HasColumnName("pin")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PinLastModifiedDate)
                    .HasColumnName("pinLastModifiedDate")
                    .HasColumnType("datetime");

                entity.Property(e => e.PrimaryEmail)
                    .IsRequired()
                    .HasColumnName("primaryEMail")
                    .HasMaxLength(255);

                entity.Property(e => e.RoleId).HasColumnName("roleId");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasColumnName("username")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Uuid)
                    .HasColumnName("UUID")
                    .HasDefaultValueSql("(newsequentialid())");

                entity.Property(e => e.ValidPassword)
                    .IsRequired()
                    .HasColumnName("validPassword")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.DeletedBy)
                    .WithMany(p => p.InverseDeletedBy)
                    .HasForeignKey(d => d.DeletedById)
                    .HasConstraintName("FK_deletedById_users");

                entity.HasOne(d => d.LastModifiedBy)
                    .WithMany(p => p.InverseLastModifiedBy)
                    .HasForeignKey(d => d.LastModifiedById)
                    .HasConstraintName("FK_modifiedById_users");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_roleId_roles");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
